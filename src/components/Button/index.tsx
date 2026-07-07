import "./style.css"

type ButtonProps = {
    title: string
    type?: string | undefined
    size?: string | undefined
    onClick: () => void
}

export function Button({ title, type, size, onClick } : ButtonProps) {
    return <button className={`btn ${type || 'btn--primary'} ${size || 'btn--md'}`} onClick={onClick}>{title}</button>
}
