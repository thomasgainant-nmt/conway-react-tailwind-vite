export function Cell({ habited = false }){
    let content = habited ? "🦠" : "";

    return (
        <td className="cell">{content}</td>
    )
}