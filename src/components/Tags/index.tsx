import "./style.css"

export function Tags({tags}) {
    if (!tags) return
    const tagsArray = tags && tags.split(',')
    return (
        <div className="task-card-tags">
            {tagsArray.map((tag, idx) => {
                return <span className="tag tag-primary" key={idx}>{tag}</span>
            })}
        </div>
    )
}