export type MDulProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>;

export const MDul: React.FC<MDulProps> = ({ children, ...props }) => {
  return (
    <ul className="list-disc list-inside p-5" {...props}>
      {children}
    </ul>
  );
};

export type MDliProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLLIElement>, HTMLLIElement>;

export const MDli: React.FC<MDliProps> = ({ children, ...props }) => {
  return (
    <li className="marker:text-white dark:text-zinc-400 text-base/6 text-zinc-500" {...props}>
      {children}
    </li>
  );
};


