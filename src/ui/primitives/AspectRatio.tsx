export type AspectRatioProps = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "className"
> & {
  ratio: number;
};

// Use ref.current.style instead of inline style for better security
export const AspectRatio: React.FC<AspectRatioProps> = ({ ratio, children }) => (
  <div className="relative w-full" style={{ paddingBottom: `${ratio * 100}%` }}>
    <figure className="absolute inset-0">{children}</figure>
  </div>
);
