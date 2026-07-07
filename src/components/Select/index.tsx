import "./style.css"
type SelectProps = {
    label?: string
    required?: boolean
    values: string[][]
    id?: string
    name: string
    selected?: string
    onChange?: () => void
}
export function Select({label, required, values, id, name, selected, onChange}: SelectProps) {
    return (
        <div className="select">
            {label && <label htmlFor={id} className="text-input__label">{label} {required && <span className="text-input__required">*</span>}</label>}
            <select 
                id={id}
                className="select-field"
                name={name}
                defaultValue={selected ? selected : ''}
                onChange={(e) => onChange && onChange(e)}
            >
                {values.map((val) => {
                    return <option key={val[0]} value={val[0]}>{val[1]}</option>
                })}
            </select>
        </div>
    )
}