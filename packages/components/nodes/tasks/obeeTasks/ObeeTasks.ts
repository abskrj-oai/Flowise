import { INode, INodeData, INodeParams } from '../../../src/Interface'
import { getBaseClasses } from '../../../src/utils'
import { ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate } from '@langchain/core/prompts'

class OBEETask implements INode {
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
        this.label = 'OBEE Tasks'
        this.name = 'obeeTasks'
        this.version = 1.0
        this.type = 'PromptTemplate'
        this.description = 'Create task for your chatbot.'
        this.icon = 'obeeTasks.svg'
        this.category = 'Tasks'
        this.baseClasses = [this.type, ...getBaseClasses(ChatPromptTemplate)]
        this.inputs = [
            {
                label: 'Title',
                name: 'title',
                type: 'string'
            },
            {
                label: 'Goal',
                name: 'goal',
                type: 'string',
                rows: 4
            },
            {
                label: 'Characteristics',
                name: 'characteristics',
                type: 'string',
                rows: 3
            }
        ]
    }

    async init(nodeData: INodeData): Promise<any> {
        const title = nodeData.inputs?.title as string
        const goal = nodeData.inputs?.goal as string
        const characteristics = nodeData.inputs?.characteristics as string

        const templ = `${title}
        ${goal}
        ${characteristics}
        `

        const userMessage = '{question}'

        const prompt = ChatPromptTemplate.fromMessages([
            SystemMessagePromptTemplate.fromTemplate(templ),
            HumanMessagePromptTemplate.fromTemplate(userMessage)
        ])

        return prompt
    }
}

module.exports = { nodeClass: OBEETask }
