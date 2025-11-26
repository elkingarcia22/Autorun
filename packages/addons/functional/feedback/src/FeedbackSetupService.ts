/**
 * FeedbackSetupService
 *
 * Servicio que ayuda a configurar automáticamente el sistema de feedback:
 * - Genera el flujo de n8n como JSON descargable
 * - Crea el Google Sheet automáticamente usando la API de Google
 * - Configura el webhook URL
 */

export interface SetupOptions {
	projectName?: string;
	slackChannelId?: string;
	slackWebhookUrl?: string;
	googleSheetId?: string;
	googleSheetsCredentials?: {
		clientEmail?: string;
		privateKey?: string;
	};
	geminiApiKey?: string;
}

export class FeedbackSetupService {
	/**
	 * Genera el JSON del flujo de n8n listo para importar
	 * Incluye: Webhook → Google Sheets (guardar feedback)
	 * Y: Schedule → Leer → Filtrar → Agrupar → Gemini → Slack (análisis diario)
	 * 
	 * Usa el JSON completo con IA (Gemini) y Slack como base
	 */
	static generateN8nWorkflow(options: SetupOptions = {}): string {
		const projectName = options.projectName || 'Feedback';
		const slackChannelId = options.slackChannelId || 'C09MZ8E2EER';
		const geminiApiKey = options.geminiApiKey || 'YOUR_GEMINI_API_KEY';
		const googleSheetId = options.googleSheetId || '{{GOOGLE_SHEET_ID}}';

		// Cargar el JSON completo como base
		const baseWorkflow = this.getCompleteWorkflowTemplate();

		// Personalizar el workflow
		baseWorkflow.name = `${projectName} → Google Sheets`;

		// Actualizar Google Sheet ID en los nodos que lo usan
		const getRowsNode = baseWorkflow.nodes.find((n: any) => n.name === 'Get row(s) in sheet');
		if (getRowsNode && getRowsNode.parameters.documentId) {
			getRowsNode.parameters.documentId.value = googleSheetId;
		}

		const appendNode = baseWorkflow.nodes.find((n: any) => n.name === 'Append row in sheet1');
		if (appendNode && appendNode.parameters.documentId) {
			appendNode.parameters.documentId.value = googleSheetId;
		}

		// Actualizar Gemini API Key
		const httpRequestNode = baseWorkflow.nodes.find((n: any) => n.name === 'HTTP Request');
		if (httpRequestNode && httpRequestNode.parameters.url) {
			// Reemplazar la API key en la URL
			const url = httpRequestNode.parameters.url as string;
			const newUrl = url.replace(/key=[^&]+/, `key=${geminiApiKey}`);
			httpRequestNode.parameters.url = newUrl;
		}

		// Actualizar Slack Channel ID
		const slackNode = baseWorkflow.nodes.find((n: any) => n.name === 'Send a message');
		if (slackNode && slackNode.parameters.channelId) {
			slackNode.parameters.channelId.value = slackChannelId;
		}

		// Generar nuevos IDs para evitar conflictos
		baseWorkflow.id = this.generateId();
		baseWorkflow.versionId = this.generateId();
		baseWorkflow.nodes.forEach((node: any) => {
			node.id = this.generateId();
			if (node.webhookId) {
				node.webhookId = this.generateId();
			}
		});

		return JSON.stringify(baseWorkflow, null, 2);
	}

	/**
	 * Retorna el template completo del workflow con IA y Slack
	 */
	private static getCompleteWorkflowTemplate(): any {
		// JSON completo del workflow con IA (Gemini) y Slack
		return {
			name: 'Feedback → Google Sheets',
			nodes: [
				{
					parameters: {
						httpMethod: 'POST',
						path: 'feedback',
						responseMode: 'responseNode',
						options: {
							responseHeaders: {
								entries: [
									{ name: 'Key', value: 'Content-Type' },
									{ name: 'Value', value: 'application/json' },
								],
							},
						},
					},
					type: 'n8n-nodes-base.webhook',
					typeVersion: 2.1,
					position: [0, 0],
					id: this.generateId(),
					name: 'Webhook',
					webhookId: this.generateId(),
					onError: 'continueRegularOutput',
				},
				{
					parameters: {
						assignments: {
							assignments: [
								{ id: this.generateId(), name: 'user', value: '={{$json["body"]["user"]}}', type: 'string' },
								{ id: this.generateId(), name: 'section', value: '={{$json["body"]["section"]}}', type: 'string' },
								{ id: this.generateId(), name: 'comment', value: '={{$json["body"]["comment"]}}', type: 'string' },
								{ id: this.generateId(), name: 'timestamp', value: '={{$json["body"]["timestamp"]}}', type: 'string' },
								{ id: this.generateId(), name: 'ts_recibido', value: '={{$now}}', type: 'string' },
							],
						},
						options: {},
					},
					type: 'n8n-nodes-base.set',
					typeVersion: 3.4,
					position: [208, 0],
					id: this.generateId(),
					name: 'Edit Fields',
				},
				{
					parameters: {
						respondWith: 'json',
						responseBody: '={ "ok": true }',
						options: {
							responseCode: 200,
							responseHeaders: {
								entries: [
									{ name: 'Key', value: 'Content-Type' },
									{ name: 'Value', value: 'application/json' },
								],
							},
						},
					},
					type: 'n8n-nodes-base.respondToWebhook',
					typeVersion: 1.4,
					position: [640, 0],
					id: this.generateId(),
					name: 'Respond to Webhook',
					onError: 'continueRegularOutput',
				},
				{
					parameters: {
						rule: {
							interval: [
								{
									field: 'weeks',
									triggerAtDay: [5],
									triggerAtHour: 8,
								},
							],
						},
					},
					type: 'n8n-nodes-base.scheduleTrigger',
					typeVersion: 1.2,
					position: [-16, 272],
					id: this.generateId(),
					name: 'Schedule Trigger',
				},
				{
					parameters: {
						documentId: {
							__rl: true,
							value: '{{GOOGLE_SHEET_ID}}',
							mode: 'list',
						},
						sheetName: {
							__rl: true,
							value: 'gid=0',
							mode: 'list',
						},
						options: {},
					},
					type: 'n8n-nodes-base.googleSheets',
					typeVersion: 4.7,
					position: [192, 272],
					id: this.generateId(),
					name: 'Get row(s) in sheet',
					credentials: {
						googleSheetsOAuth2Api: {
							id: 'OPpRSlabI1U67DfS',
							name: 'Google Sheets account',
						},
					},
					onError: 'continueRegularOutput',
				},
				{
					parameters: {
						jsCode: `// Agrupa por "Sección", cuenta por sección y arma ejemplos (máx 3 por sección).
// Además, concatena los comentarios para dar contexto compacto al LLM.
// Entrada esperada de cada item: { Nombre, Sección, Comentario, fecha, ts_recibido, date_bucket }

const itemsIn = items.map(i => i.json);

// Fecha (bucket) dominante para el reporte (si hay varias, toma la más reciente)
let latestBucket = null;
for (const it of itemsIn) {
  if (!latestBucket || (it.date_bucket > latestBucket)) latestBucket = it.date_bucket;
}

// Agrupación por sección
const bySection = {};
for (const it of itemsIn) {
  const sec = it["Sección"] || "Sin sección";
  if (!bySection[sec]) {
    bySection[sec] = { seccion: sec, count: 0, ejemplos: [] };
  }
  bySection[sec].count += 1;
  if (it["Comentario"] && bySection[sec].ejemplos.length < 3) {
    bySection[sec].ejemplos.push(it["Comentario"]);
  }
}

// Ordena secciones por mayor frecuencia
const sectionsArr = Object.values(bySection).sort((a, b) => b.count - a.count);

// Concatena comentarios (limitamos longitud para el prompt)
const allComments = itemsIn
  .filter(it => it["Comentario"])
  .map(it => \`• [\${it["Sección"] || "Sin sección"}] \${it["Comentario"]}\`)
  .join("\\n");

const MAX_LEN = 6000; // corta por seguridad de tokens
const commentsCompact = allComments.length > MAX_LEN
  ? allComments.slice(0, MAX_LEN) + "\\n…(truncado)…"
  : allComments;

// Prepara un resumen meta
const summary = {
  date_bucket: latestBucket || null,
  total_feedbacks_24h: itemsIn.length,
  sections: sectionsArr,
  comments_compact: commentsCompact
};

// Devolvemos un SOLO item con todo junto (más fácil de mapear luego)
return [{ json: summary }];`,
					},
					type: 'n8n-nodes-base.code',
					typeVersion: 2,
					position: [608, 272],
					id: this.generateId(),
					name: 'agrupar por "Sección" y compactar comentarios',
				},
				{
					parameters: {
						jsCode: `// Filtra los items de las últimas 24 horas tomando como base la zona America/Bogota (UTC-05)

function parseDateToUTC(d) {
  const dt = new Date(d);
  return isNaN(dt.getTime()) ? null : dt;
}

// Ahora (UTC) y ventana de 24h hacia atrás
const nowUtc = new Date();
const startUtc = new Date(nowUtc.getTime() - 24 * 60 * 60 * 1000);
const endUtc = nowUtc;

const filtered = [];
for (const item of items) {
  const nombre = item.json["Nombre"] ?? item.json["nombre"];
  const seccion = item.json["Sección"] ?? item.json["seccion"];
  const comentario = item.json["Comentario"] ?? item.json["comentario"];
  const fechaISO = item.json["ts_recibido"] ?? item.json["fecha"];
  if (!fechaISO) continue;

  const dt = parseDateToUTC(fechaISO);
  if (!dt) continue;

  if (dt >= startUtc && dt <= endUtc) {
    // Para agrupar por día (YYYY-MM-DD) según Bogotá:
    const bogotaMs = dt.getTime() - (5 * 60 * 60 * 1000);
    const b = new Date(bogotaMs);
    const y = b.getUTCFullYear();
    const m = String(b.getUTCMonth() + 1).padStart(2, "0");
    const d = String(b.getUTCDate()).padStart(2, "0");
    const date_bucket = \`\${y}-\${m}-\${d}\`;

    filtered.push({
      json: {
        row_number: item.json.row_number,
        Nombre: nombre,
        Sección: seccion,
        Comentario: comentario,
        fecha: item.json["fecha"] ?? null,
        ts_recibido: item.json["ts_recibido"] ?? null,
        date_bucket
      }
    });
  }
}

if (filtered.length === 0) {
  return [
    {
      json: {
        empty: true,
        message: "No hay feedback en las últimas 24 horas.",
        window_utc: {
          start: startUtc.toISOString(),
          end: endUtc.toISOString()
        }
      }
    }
  ];
}

return filtered;`,
					},
					type: 'n8n-nodes-base.code',
					typeVersion: 2,
					position: [400, 272],
					id: this.generateId(),
					name: 'filtrar por día anterior',
				},
				{
					parameters: {
						method: 'POST',
						url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-latest:generateContent?key=YOUR_GEMINI_API_KEY',
						sendHeaders: true,
						headerParameters: {
							parameters: [
								{ name: 'Content-Type', value: 'application/json' },
							],
						},
						sendBody: true,
						specifyBody: 'json',
						jsonBody: '={{$json.Type}}',
						options: {},
					},
					type: 'n8n-nodes-base.httpRequest',
					typeVersion: 4.2,
					position: [1024, 272],
					id: this.generateId(),
					name: 'HTTP Request',
					retryOnFail: true,
					maxTries: 4,
					waitBetweenTries: 3000,
					onError: 'continueRegularOutput',
				},
				{
					parameters: {
						assignments: {
							assignments: [
								{ id: this.generateId(), name: 'Name', value: 'gemini_body', type: 'string' },
								{
									id: this.generateId(),
									name: 'Type',
									value: `={
  "generationConfig": {
    "temperature": 0.2,
    "maxOutputTokens": 5000
  },
  "contents": [
    {
      "parts": [
        {
          "text": "Eres un analista de experiencia de usuario. Recibes comentarios reales de usuarios (últimas 24h) con su sección y un resumen. Tu tarea es: 1) identificar temas clave (por frecuencia y severidad), 2) sintetizar insights accionables, 3) proponer un plan priorizado (P1/P2/P3) con acciones concretas, 4) sugerir quick wins, 5) riesgos si no se actúa, 6) métricas para seguimiento la próxima semana. NO inventes datos ni supongas lo que no está en los comentarios."
        },
        {
          "text": "Formato de salida (en JSON estricto): {\\"date_bucket\\": string, \\"resumen\\": string, \\"top_themes\\": [{\\"section\\": string, \\"count\\": number, \\"sample_quotes\\": string[]}], \\"insights\\": string[], \\"priorities\\": [{\\"priority\\": \\"P1\\"|\\"P2\\"|\\"P3\\", \\"action\\": string, \\"rationale\\": string, \\"expected_impact\\": string, \\"owner_sugerido\\": string}], \\"quick_wins\\": string[], \\"riesgos\\": string[], \\"metricas_sugeridas\\": string[]}"
        },
        {
          "text": "Secciones y conteos (JSON): [{\\"seccion\\": \\"Resultados Emocionales\\", \\"count\\": 1, \\"ejemplos\\": [\\"Necesito más gráficos de tendencias\\"]}, {\\"seccion\\": \\"Entorno Laboral\\", \\"count\\": 1, \\"ejemplos\\": [\\"La interfaz es muy intuitiva, pero falta un botón de exportar\\"]}]"
        },
        {
          "text": "Comentarios compactos (uno por línea): • [Resultados Emocionales] Necesito más gráficos de tendencias • [Entorno Laboral] La interfaz es muy intuitiva, pero falta un botón de exportar"
        },
        {
          "text": "date_bucket: 2025-10-22, total_feedbacks_24h: 2"
        }
      ]
    }
  ]
}`,
									type: 'object',
								},
							],
						},
						includeOtherFields: true,
						options: {},
					},
					type: 'n8n-nodes-base.set',
					typeVersion: 3.4,
					position: [816, 272],
					id: this.generateId(),
					name: 'construir_gemini_body',
					onError: 'continueRegularOutput',
				},
				{
					parameters: {
						jsCode: `// Extrae el texto JSON dentro de la respuesta de Gemini
const raw = items[0].json.candidates[0].content.parts[0].text;

// Elimina los backticks y el tag \`\`\`json\`\`\` si los hay
const cleaned = raw
  .replace(/\`\`\`json/g, "")
  .replace(/\`\`\`/g, "")
  .trim();

// Intenta convertirlo en objeto
let data;
try {
  data = JSON.parse(cleaned);
} catch (err) {
  return [{ json: { error: "Error al parsear JSON de Gemini", detalle: err.message, raw: cleaned } }];
}

// Construye un resumen legible tipo Slack o correo
const resumen = \`*🗓️ Reporte diario - Feedback \${data.date_bucket}*\\n\\n\` +
\`*Resumen general:*\\n\${data.resumen}\\n\\n\` +
\`*🎯 Prioridades:*\\n\${data.priorities.map(p => \`• *\${p.priority}* → \${p.action}\\n   _Razonamiento:_ \${p.rationale}\\n   _Impacto:_ \${p.expected_impact}\\n   _Owner sugerido:_ \${p.owner_sugerido}\`).join("\\n\\n")}\\n\\n\` +
\`*⚡ Quick wins:*\\n\${data.quick_wins.map(q => \`• \${q}\`).join("\\n")}\\n\\n\` +
\`*⚠️ Riesgos:*\\n\${data.riesgos.map(r => \`• \${r}\`).join("\\n")}\\n\\n\` +
\`*📊 Métricas sugeridas:*\\n\${data.metricas_sugeridas.map(m => \`• \${m}\`).join("\\n")}\`;

// Devuelve el objeto limpio + resumen para Slack o Email
return [{
  json: {
    data,
    resumen_texto: resumen
  }
}];`,
					},
					type: 'n8n-nodes-base.code',
					typeVersion: 2,
					position: [1232, 272],
					id: this.generateId(),
					name: 'Code in JavaScript',
				},
				{
					parameters: {
						authentication: 'oAuth2',
						select: 'channel',
						channelId: {
							__rl: true,
							value: 'C09MZ8E2EER',
							mode: 'list',
						},
						text: '={{$json.resumen_texto}}',
						otherOptions: {},
					},
					type: 'n8n-nodes-base.slack',
					typeVersion: 2.3,
					position: [1440, 272],
					id: this.generateId(),
					name: 'Send a message',
					webhookId: this.generateId(),
					credentials: {
						slackOAuth2Api: {
							id: 'b0JXGJEPExHMin1o',
							name: 'Slack account 2',
						},
					},
				},
				{
					parameters: {
						operation: 'append',
						documentId: {
							__rl: true,
							value: '{{GOOGLE_SHEET_ID}}',
							mode: 'list',
						},
						sheetName: {
							__rl: true,
							value: 'gid=0',
							mode: 'list',
						},
						columns: {
							mappingMode: 'defineBelow',
							value: {
								user: '={{$json.user}}',
								section: '={{$json.section}}',
								comment: '={{$json.comment}}',
								timestamp: '={{$json.timestamp}}',
								ts_recibido: '={{$json.ts_recibido}}',
							},
							matchingColumns: [],
							schema: [
								{ id: 'user', displayName: 'user', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
								{ id: 'section', displayName: 'section', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
								{ id: 'comment', displayName: 'comment', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
								{ id: 'timestamp', displayName: 'timestamp', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
								{ id: 'ts_recibido', displayName: 'ts_recibido', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
							],
							attemptToConvertTypes: false,
							convertFieldsToString: false,
						},
						options: {},
					},
					type: 'n8n-nodes-base.googleSheets',
					typeVersion: 4.7,
					position: [416, 0],
					id: this.generateId(),
					name: 'Append row in sheet1',
					credentials: {
						googleSheetsOAuth2Api: {
							id: 'OPpRSlabI1U67DfS',
							name: 'Google Sheets account',
						},
					},
					onError: 'continueRegularOutput',
				},
			],
			pinData: {},
			connections: {
				Webhook: {
					main: [[{ node: 'Edit Fields', type: 'main', index: 0 }]],
				},
				'Edit Fields': {
					main: [[{ node: 'Append row in sheet1', type: 'main', index: 0 }]],
				},
				'Schedule Trigger': {
					main: [[{ node: 'Get row(s) in sheet', type: 'main', index: 0 }]],
				},
				'Get row(s) in sheet': {
					main: [[{ node: 'filtrar por día anterior', type: 'main', index: 0 }]],
				},
				'filtrar por día anterior': {
					main: [[{ node: 'agrupar por "Sección" y compactar comentarios', type: 'main', index: 0 }]],
				},
				'agrupar por "Sección" y compactar comentarios': {
					main: [[{ node: 'construir_gemini_body', type: 'main', index: 0 }]],
				},
				'construir_gemini_body': {
					main: [[{ node: 'HTTP Request', type: 'main', index: 0 }]],
				},
				'HTTP Request': {
					main: [[{ node: 'Code in JavaScript', type: 'main', index: 0 }]],
				},
				'Code in JavaScript': {
					main: [[{ node: 'Send a message', type: 'main', index: 0 }]],
				},
				'Append row in sheet1': {
					main: [[{ node: 'Respond to Webhook', type: 'main', index: 0 }]],
				},
			},
			active: true,
			settings: {
				executionOrder: 'v1',
			},
			versionId: this.generateId(),
			meta: {
				templateCredsSetupCompleted: true,
			},
			id: this.generateId(),
			tags: [],
		};
	}

	/**
	 * Crea un Google Sheet usando la API de Google
	 * Requiere credenciales de servicio de Google
	 */
	static async createGoogleSheet(
		title: string,
		credentials: {
			clientEmail: string;
			privateKey: string;
		},
	): Promise<{ success: boolean; sheetId?: string; url?: string; error?: string }> {
		try {
			// Nota: Esto requiere la librería googleapis
			// En un entorno real, necesitarías instalar: npm install googleapis

			// Por ahora, retornamos instrucciones
			return {
				success: false,
				error:
					'Para crear el Google Sheet automáticamente, necesitas usar la API de Google Sheets. Ver instrucciones en el README.',
			};
		} catch (error: any) {
			return {
				success: false,
				error: error.message,
			};
		}
	}

	/**
	 * Genera instrucciones para crear el Google Sheet manualmente
	 */
	static getGoogleSheetsInstructions(): string {
		return `
# 📊 Crear Google Sheet para Feedback

## Opción 1: Crear manualmente (Recomendado)

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea un nuevo documento
3. Nombra la primera fila con estos encabezados:
   - user
   - section
   - comment
   - timestamp
   - ts_recibido

4. Copia el ID del documento desde la URL:
   \`https://docs.google.com/spreadsheets/d/[ESTE_ES_EL_ID]/edit\`

5. Comparte el documento con el email de tu cuenta de servicio de Google (si usas OAuth)

## Opción 2: Usar la API de Google Sheets

Necesitas:
- Credenciales de servicio de Google (Service Account)
- Habilitar la API de Google Sheets

Luego puedes usar este código:

\`\`\`typescript
import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: 'tu-service-account@...',
    private_key: '-----BEGIN PRIVATE KEY-----...',
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

const response = await sheets.spreadsheets.create({
  requestBody: {
    properties: {
      title: 'Feedback',
    },
    sheets: [
      {
        properties: {
          title: 'Hoja 1',
        },
      },
    ],
  },
});

const sheetId = response.data.spreadsheetId;
console.log('Sheet creado:', sheetId);
\`\`\`
`;
	}

	/**
	 * Genera un ID único para los nodos de n8n
	 */
	private static generateId(): string {
		return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
	}

}



