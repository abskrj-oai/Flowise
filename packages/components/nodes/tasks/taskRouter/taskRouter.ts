import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from '@langchain/core/prompts'
import { INode, INodeData, INodeParams } from '../../../src/Interface'
import { getBaseClasses } from '../../../src'

class TaskRouter implements INode {
    label: string
    name: string
    version: number
    description: string
    type: string
    icon: string
    category: string
    baseClasses: string[]
    inputs: INodeParams[]
    credential: INodeParams

    constructor() {
        this.label = 'Task Router'
        this.name = 'taskRouter'
        this.version = 1.0
        this.type = 'ChatPromptTemplate'
        this.description = 'Create task for your chatbot.'
        this.icon = 'taskRouter.svg'
        this.category = 'Tasks'
        this.baseClasses = [this.type, ...getBaseClasses(ChatPromptTemplate)]
        this.inputs = [
            {
                label: 'Task',
                name: 'task',
                type: 'Task'
            }
        ]
    }

    async init(nodeData: INodeData): Promise<any> {
        const task = nodeData.inputs?.task as string

        const templ = `
        You are a virtual agent. You have a list of task, you have to ask user how can you help them
        and based on user's response you have to select a task match with a title of the task, and follow the goal and characteristics of the task.

        ${task}
        `

        const userMessage = '{input}'

        const prompt = ChatPromptTemplate.fromMessages([
            SystemMessagePromptTemplate.fromTemplate(templ),
            HumanMessagePromptTemplate.fromTemplate(userMessage)
        ])

        return prompt
    }
}

module.exports = { nodeClass: TaskRouter }
