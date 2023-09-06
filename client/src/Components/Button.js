const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;