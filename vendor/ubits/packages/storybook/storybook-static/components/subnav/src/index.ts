/**
 * @ubits/subnav
 * Export público del add-on SubNav
 */

export { renderSubNav, createSubNav, updateActiveSubNavTab } from './SubNavProvider';
export type {
  SubNavOptions,
  SubNavTab,
  SubNavVariant
} from './types/SubNavOptions';
export { getSubNavConfig, SUBNAV_VARIANTS } from './configs/subNavVariants';

