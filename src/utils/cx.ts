/**
 * Combine and filter falsy css classes in CSS Modules
 */
const cx = (...args: any[]) => args.filter((arg) => !!arg).join(" ");

export default cx;
