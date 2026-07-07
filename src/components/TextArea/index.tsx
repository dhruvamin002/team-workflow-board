import "./style.css"
type TextAreaInputProps = {
    label?: string
    placeholder?: string
    required?: boolean
    id?: string
    name: string
    error?: string
}
export function TextArea({label, placeholder, required, id, name, error}: TextAreaInputProps) {
    return (
        <div className="text-input">
            {label && <label htmlFor={id} className="text-input__label">{label} {required && <span className="text-input__required">*</span>}</label>}
            <textarea
                id={id}
                placeholder={placeholder}
                required={required}
                className={`text-input-field text-input__field--textarea ${error ? 'text-input__field--error': ''}`}
                name={name}
            />
            {error ? <span className="text-input__error">{error}</span> : null}
        </div>
    )
}