import { CanvasCreator } from '../packages/autorun-core/src/wizard/CanvasCreator';

async function main() {
    console.log('Creando un canvas automatizado...');
    const creator = new CanvasCreator(process.cwd());
    const content = await creator.create(
        'template-admin',
        'inicio',
        'Administrador',
        true
    );
    console.log('✅ Canvas creado. Revisa la carpeta prototypes/');
}

main().catch(console.error);
