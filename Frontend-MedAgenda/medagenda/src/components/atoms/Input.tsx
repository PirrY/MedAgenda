import { Field, UseFormRegister, FieldValues, Path } from "react-hook-form"
import { LoginDTO } from "@/interfaces/login"
import { RegisterDTO } from "@/interfaces/register"

interface ValuesSelect {
  value: string;
  label: string;
}

interface InputComponentsProps<T extends FieldValues> {
  label: string;
  typeElement: "text" | "password";
  idElement: string;
  nameRegister: Path<T>;
  listValues?: ValuesSelect[];
  register: UseFormRegister<T>;
}

export default function InputComponents <T extends FieldValues>({
  label,
  typeElement,
  idElement,
  listValues,
  nameRegister,
  register
}: InputComponentsProps<T>) {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={idElement} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      {listValues?.length ? (
        <select {...register(nameRegister)}>
          {listValues.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...register(nameRegister)}
          type={typeElement}
          id={idElement}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-black"
        />
      )}
    </div>
  )
}
