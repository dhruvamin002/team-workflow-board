import { useTasks } from "../../hooks"
import { Button } from "../Button"
import { CheckBox } from "../CheckBox"
import { Select } from "../Select"
import { TextInput } from "../TextInput"
import "./style.css"
export function FilterStrip() {
    const { filterState, filterByStatus, filterBySearchPriority, changeSort, changeSortDirection } = useTasks()
    return (
        <div className="task-filters">
            <TextInput 
                label= "Search" 
                placeholder="Search title or description"
                id="filter-search"
                name="filter-search"
                onChange={(e) => filterBySearchPriority('search', e.target.value)}
                defaultValue={filterState && filterState.filter && filterState.filter.search}
            />
            <CheckBox 
                label="Status"
                id="filter-status"
                boxes={[["backlog", "Backlog"], ["progress", "In Progress"], ["done", "Done"]]}
                onChange={filterByStatus}
                checked={filterState && filterState.filter && filterState.filter.status ? filterState.filter.status : []}
            />
            <Select
                label="Priority"
                values={[["all", "ALL Priority"], ["low", "Low"], ["medium", "Medium"], ["high", "High"]]}
                id="filter-priority"
                name="filter-priority"
                selected="all"
                onChange={(e) => filterBySearchPriority('priority', e.target.value)}
                defaultValue={(filterState && filterState.filter && filterState.filter.priority) || 'all'}
            />
            <Select 
                label="Sort By"
                values={[["priority", "Priority"], ["created", "Created Date"], ["updated", "Updated Date"]]}
                id="filter-sortby"
                name="filter-sortby"
                selected="priority"
                onChange={(e) => changeSort(e.target.value)}
                defaultValue={(filterState && filterState.sortBy) || 'priority'}
            />
            <div className="task-filters__actions">
                <Button title={!filterState.sortDirection || filterState.sortDirection === "asc" ? "ASC" : "DSC"} type="btn--secondary" onClick={changeSortDirection}/>
            </div>
        </div>
    )
}
