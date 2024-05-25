export type MDhrProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLHRElement>, HTMLHRElement>;

export const MDhr: React.FC<MDhrProps> = ({ ...props }) => {
  return <hr className="mt-12 mb-10 border dark:border-white/[0.2]" {...props} />
};


