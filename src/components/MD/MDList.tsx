export type MDulProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>;

export const MDul: React.FC<MDulProps> = ({ children, ...props }) => {
  return (
    <ul className="list-inside list-disc p-5" {...props}>
      {children}
    </ul>
  );
};

export type MDliProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLLIElement>, HTMLLIElement>;

export const MDli: React.FC<MDliProps> = ({ children, ...props }) => {
  return (
    <li className="text-base/6 text-zinc-500 dark:marker:text-white dark:text-zinc-400 marker:text-black" {...props}>
      {children}
    </li>
  );
};
