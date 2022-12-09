

function CompletedTabCard({ tab, user }) {

    let expenses = []
    tab.users.forEach(user => {
        let useritems = tab.items.filter(item=>{
            return (item.user_id===user.id)
        })
        let exp = useritems.reduce(function (acc, item) { return acc+item.price},0).toFixed(2)
        expenses.push({
            name: user.full_name,
            expense: exp
        })
    });
    let myExp = expenses.find(u=>{
        return (u.name===user.full_name)
    }).expense

    let otherExp = expenses.filter(e=>{
        return e.name!==user.full_name
    })

    function payment() {
        return otherExp.map((exp)=>{
            if (exp.expense-myExp>=0) {
                return (<p>You owe {exp.name} ${((exp.expense-myExp)/expenses.length).toFixed(2)}</p>)
            } else {
                return (<p>{exp.name} will pay you ${((myExp-exp.expense)/expenses.length).toFixed(2)}</p>)
            }
        })
    }

    console.log(expenses)

    return (
        <>
            {payment()}
        </>
    )
}

export default CompletedTabCard