import "../../styles/index.css";

interface IMainProps {
  title?: string;
  children?: React.ReactNode;
}

export default function MainTemplate({ title, children }: IMainProps) {
  return (
    <div className="mx-auto max-w-2xl lg:max-w-7xl">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        {title ? <h1 className="text-4xl font-bold">{title}</h1> : null}
      </div>

      <br />
      <div>{children}</div>
    </div>
  );
}
