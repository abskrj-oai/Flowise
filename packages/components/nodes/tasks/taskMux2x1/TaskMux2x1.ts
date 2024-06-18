import { INode, INodeData, INodeParams } from '../../../src/Interface'

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
        this.label = '2x1 Task MUX'
        this.name = 'taskMux2x1'
        this.version = 1.0
        this.type = 'Task'
        this.description = 'Multiplex multiple tasks together.'
        this.icon = 'taskMux2x1.svg'
        this.category = 'Tasks'
        this.baseClasses = [this.type]
        this.inputs = [
            {
                label: 'Task 1',
                name: 'task1',
                type: 'Task'
            },
            {
                label: 'Task 2',
                name: 'task2',
                type: 'Task'
            }
        ]
    }

    async init(nodeData: INodeData): Promise<any> {
        const task1 = nodeData.inputs?.task1 as string
        const task2 = nodeData.inputs?.task2 as string

        const templ = `
        
        ${task1}

        ${task2}
        `

        return templ
    }
}

module.exports = { nodeClass: OBEETask }
