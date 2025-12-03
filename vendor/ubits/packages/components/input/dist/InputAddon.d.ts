/**
 * InputAddon
 * Add-on para el componente Input UBITS
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
import './styles/input.css';
export declare class InputAddon implements ComponentAddon {
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
//# sourceMappingURL=InputAddon.d.ts.map
