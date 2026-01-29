/**
 * SliderAddon
 * Add-on para el componente Slider UBITS
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
declare global {
	interface Window {
		UBITS?: {
			Slider?: {
				create: (options: any) => any;
				render: (options: any) => string;
			};
			[key: string]: any;
		};
		createSlider?: (options: any) => any;
	}
}
import './styles/slider.css';
export declare class SliderAddon implements ComponentAddon {
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
//# sourceMappingURL=SliderAddon.d.ts.map
