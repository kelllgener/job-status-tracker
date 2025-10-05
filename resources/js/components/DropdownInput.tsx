import { useState } from "react";

interface Status {
  id: number;
  name: string;
}
interface DropdownInputProps {
  options: Status[];
  value?: number; // currently selected status id
  onChange?: (newStatusId: number) => void;
  label?: string;
}

const DropdownInput = ({ options, value, onChange, label }: DropdownInputProps) => {
  const [selected, setSelected] = useState<number>(value ?? options[0]?.id ?? 0);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = Number(e.target.value);
    setSelected(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <div className="flex flex-col">
      {label && <label htmlFor="status-select" className="mb-1 text-xs font-medium">{label}</label>}
      <select
        id="status-select"
        value={selected}
        onChange={handleChange}
        className="border rounded px-2 py-1 text-xs focus:outline-none focus:ring focus:border-blue-300"
      >
        {options.map((status) => (
          <option key={status.id} value={status.id}>
            {status.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownInput;
