import "./style.css"
type TextInputProps = {
    label?: string
    placeholder?: string
    required?: boolean
    id?: string
    name: string
    error?: string
    defaultValue?: string
    onChange?: () => void
}
export function TextInput({label, placeholder, required, id, name, error, defaultValue, onChange}: TextInputProps) {
    return (
        <div className="text-input">
            {label && <label htmlFor={id} className={`text-input__label`}>{label} {required && <span className="text-input__required">*</span>}</label>}
            <input 
                type="text"
                id={id}
                placeholder={placeholder}
                required={required}
                className={`text-input-field ${error ? 'text-input__field--error' : ''}`}
                name={name}
                defaultValue={defaultValue ? defaultValue : ''}
                onChange={(e) => onChange && onChange(e)}
            />
            {error ? <span className="text-input__error">{error}</span> : null}
        </div>
    )
}