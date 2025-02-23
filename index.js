


const rederizacaodeprogresso = (tarefas) => {
    let progressoTarefas;
    const progressoTarefasDom = document.getElementById('barra-de-progresso');

    if( progressoTarefasDom) progressoTarefas = progressoTarefasDom;
    else{
        const novaBarraProgresso = document.createElement('div');
        novaBarraProgresso.id = 'barra-de-progresso'
        document.getElementsByTagName('footer')[0].appendChild(novaBarraProgresso);
        progressoTarefas = novaBarraProgresso;
    }


    const tarefastrue = tarefas.filter(({checked}) => checked).length ;
    const TotalTarefas = tarefas.length;

    progressoTarefas.textContent = `${tarefastrue}/${TotalTarefas} Concluidas`

}

const pegartarefasDoLS = ( ) => {
    const tarefasLocais = JSON.parse(window.localStorage.getItem('tarefas'));
    return tarefasLocais ? tarefasLocais : [];
}

const setarNoLocalStorage = (tarefas) =>{
    window.localStorage.setItem('tarefas', JSON.stringify(tarefas));
}


const removerTarefa = (tarefaId) => {
    const tarefas = pegartarefasDoLS();

    const mudarTrue = tarefas.map((item) => {
        
        return{
            ...item,
            checked: !item.checked
        }
    })

    
   
    const updatedTasks = tarefas.filter(({id}) =>parseInt(id) !== parseInt(tarefaId));
    
    setarNoLocalStorage(updatedTasks);

    document
    .getElementById( 'lista-tarefas')
    .style.textDecoration ='line-through'
    
    rederizacaodeprogresso(tarefas);
}


const criacaoIntensLista = (tarefa) => {
    

    const lista = document.getElementById('lista-tarefas');
    const toDo = document.createElement('li');
    const botaoRemoverTarefa = document.createElement('button');

    botaoRemoverTarefa.textContent='Concluir'

    botaoRemoverTarefa.onclick = () => removerTarefa(tarefa.id);
    
    toDo.textContent = tarefa.description;
    toDo.id = tarefa.id;

   
    toDo.appendChild(botaoRemoverTarefa);
     

    lista.appendChild(toDo);
    
    

    return toDo;

}



const novoId = () => {
 const tarefas = pegartarefasDoLS();
 
 const ultimoId = tarefas[tarefas.length -1]?.id;
 return ultimoId ? ultimoId + 1 : 1;
}

const getnewTaskData = (event) => {
    const description = event.target.elements.descrição.value;
    const id = novoId();

    return {id, description}
}

const creatTask = (event)  => {
    event.preventDefault();
    const newTaskData = getnewTaskData(event);
    
    criacaoIntensLista(newTaskData)
    const tarefas = pegartarefasDoLS();
    
    const updatedTasks =[
        ...tarefas,
        {description :newTaskData.description, id: newTaskData.description, checked:false }
    ]

    rederizacaodeprogresso(updatedTasks);
    setarNoLocalStorage(updatedTasks);

    document.getElementById('descrição').value =''
}


window.onload = function () {
    const form =document.getElementById('criação-tarefas-form')
    form.addEventListener('submit', creatTask )

    
    const tarefas = pegartarefasDoLS();
    
    tarefas.forEach((tarefa) => {
        criacaoIntensLista(tarefa)

    })

    rederizacaodeprogresso(tarefas)
}