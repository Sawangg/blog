export type MDpreProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement>;

export const MDpre: React.FC<MDpreProps> = ({ ...props }) => (
  <pre
    className="my-8 border p-4 text-base/6 shadow-lg outline-none dark:border-white/[0.2] focus:ring-2 focus:ring-sky-500"
    {...props}
  />
);
