export type MDpreProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement>;

export const MDpre: React.FC<MDpreProps> = ({ ...props }) => {
  return <pre className="my-8 p-4 shadow-lg outline-none border border-white/[0.2] focus:ring-2 focus:ring-sky-500" {...props} />
};

