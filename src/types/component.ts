export interface IModalConfig {
  pageName: string
  header: {
    createTitle: string
    editTitle: string
  }
  formItems: any[]
}

export interface IModalProps {
  modalConfig: IModalConfig,
  otherInfo?: any
}
