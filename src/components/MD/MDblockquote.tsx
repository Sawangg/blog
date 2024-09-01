export type MDBlockquoteProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

export const MDblockquote: React.FC<MDBlockquoteProps> = ({ children }) => (
  <blockquote className="border-black border-l-[3px] p-4">{children}</blockquote>
);
