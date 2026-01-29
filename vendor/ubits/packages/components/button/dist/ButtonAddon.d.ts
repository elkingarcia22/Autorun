/**
 * ButtonAddon
 * Clase principal del add-on Button que implementa ComponentAddon
 */
interface ComponentAddon {
	name: string;
	version: string;
	initialize(context?: any): Promise<void>;
	destroy(): void;
	getComponents(): Array<{
		name: string;
		tag: string;
		documentation?: string;
	}>;
	getStyles(): string[];
}
interface AppContext {
	[key: string]: any;
}
import './styles/button.css';
export declare class ButtonAddon implements ComponentAddon {
	name: string;
	version: string;
	initialize(context: AppContext): Promise<void>;
	destroy(): void;
	getComponents(): {
		name: string;
		tag: string;
		documentation: string;
	}[];
	getStyles(): string[];
}
export {};
//# sourceMappingURL=ButtonAddon.d.ts.map
