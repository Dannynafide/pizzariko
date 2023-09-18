import "../../styles/index.css";

type Main = {
  title: string;
  children?: React.ReactElement;
};

export default function MainTemplate({ title, children }: Main) {
  return (
    <div className="p-5">
      {title ? <h1 className="text-4xl font-bold">{title}</h1> : null}
      <br />
      <div>{children}</div>
    </div>
  );
}
