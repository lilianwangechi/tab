import { useEffect, useState } from "react"
import { Collapse, message } from 'antd';
import CompletedTabCard from "./CompletedTabCard";

function CompletedTabs({ user }) {
    const { Panel } = Collapse;
    const [tabs, setTabs] = useState([])

    useEffect(()=>{
        fetch('/api/tabs').then(r=>r.json()).then(data=>{
            let incomplete_tabs = data.filter(tab=>{
                return tab.completed===true
            })
            setTabs(incomplete_tabs)
        })
    },[])



    return(
        <div id="currenttabs">
            <Collapse>
                {tabs.map(tab=>{
                    return (
                    <Panel id="completedPanel" header={tab.name} key={tab.id}>
                        <CompletedTabCard tab={tab} user={user} />
                    </Panel>)
                })}
            </Collapse>
        </div>
    )
}

export default CompletedTabs