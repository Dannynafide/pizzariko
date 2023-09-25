import { Ingredient } from "../../types/Ingredient";
import { Operation } from "../../types/Operation";
import { Pizza } from "../../types/Pizza";

interface ICheckboxes {
  register: any;
  title: string;
  data: Pizza[] | Ingredient[] | Operation[] | null;
}

const Checkboxes = ({ register, title, data }: ICheckboxes) => {
  return (
    <div>
      <span className="text-sm font-semibold leading-6 text-gray-900">
        {title}
      </span>
      <ul className="flex flex-wrap gap-3">
        {data?.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              id={item.id}
              value={item.id}
              className="hidden peer"
              {...register}
            />
            <label
              htmlFor={item.id}
              className="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border-2 border-gray-300 rounded-lg cursor-pointer peer-checked:border-blue-600 hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50"
            >
              <span>{item.name}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Checkboxes;
