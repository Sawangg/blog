export type MDpreProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement>;

export const MDpre: React.FC<MDpreProps> = ({ ...props }) => (
  <pre className="text-base/6 my-8 p-4 shadow-lg outline-none border dark:border-white/[0.2] focus:ring-2 focus:ring-sky-500" {...props} />
);

