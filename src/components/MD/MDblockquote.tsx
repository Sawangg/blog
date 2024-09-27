export type MDBlockquoteProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

export const MDblockquote: React.FC<MDBlockquoteProps> = ({ children }) => (
  <blockquote className="border-zinc-300 border-l-[3px] p-4">{children}</blockquote>
);
