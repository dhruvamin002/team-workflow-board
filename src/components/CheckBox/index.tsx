import { useCallback } from "react"
import "./style.css"
export function CheckBox({id, name, options, label, required, defaultValue, boxes, onChange}) {
    const handleCheckBox = useCallback((e, val) => {
        onChange && onChange(val, e.target.checked)
    }, [onChange])
    return (
        <div className="text-checkbox">
            {label && <label htmlFor={id} className={`text-input__label`}>{label} {required && <span className="text-input__required">*</span>}</label>}
            <div className="checbox-inline">
                {boxes.map((box) => {
                    return (
                        <div className="text-checkbox-field" key={box[0]}>
                            <input 
                                type="checkbox"
                                required={required}
                                className="input-type-checkbox"
                                name={name}
                                id={box[0]}
                                onChange={(e) => handleCheckBox(e, box[0])}
                            />
                            <label htmlFor={box[0]}>{box[1]}</label>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}