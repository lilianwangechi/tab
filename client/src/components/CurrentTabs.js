import { useEffect, useState } from "react"
import { Collapse, message } from 'antd';
import TabCard from "./TabCard";

function CurrentTabs({ user }) {
    const { Panel } = Collapse;
    const [tabs, setTabs] = useState([])

    useEffect(()=>{
        fetch('/api/tabs').then(r=>r.json()).then(data=>{
            let incomplete_tabs = data.filter(tab=>{
                return tab.completed!==true
            })
            setTabs(incomplete_tabs)
        })
    },[])

    const handleDeleteTab = (id) => {
        fetch(`/api/tabs/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(r=>r.json())
        .then(setTabs(tabs.filter(tab => tab.id !== id)))
    };
    const success = () => {
        message.success('Settle successful, check it out in Completed Tabs');
      };

    function handleSettle(id) {
        fetch(`/api/tabs/${id}`,{
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                completed: true
            })
        }).then(r=>{
            if (r.ok) {
                let newTabs = tabs.filter(tab=>{
                    return tab.id!==id
                })
                setTabs(newTabs)
                success()
            }
        })
    }

    return(
        <div id="currenttabs">
            <Collapse>
                {tabs.map(tab=>{
                    return (
                    <Panel header={tab.name} key={tab.id}>
                        <TabCard user={user} tab={tab} handleDeleteTab={handleDeleteTab} handleSettle={handleSettle}/>
                    </Panel>)
                })}
            </Collapse>
        </div>
    )
}

export default CurrentTabs