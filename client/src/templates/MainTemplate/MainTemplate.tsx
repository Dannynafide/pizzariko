import "../../styles/index.css";

interface IMainProps {
  title?: string;
  children?: React.ReactNode;
}

export default function MainTemplate({ title, children }: IMainProps) {
  return (
    <div className="p-5">
      {title ? <h1 className="text-4xl font-bold">{title}</h1> : null}
      <br />
      <div>{children}</div>
    </div>
  );
}
