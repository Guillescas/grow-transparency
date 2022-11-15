import { ReactElement } from 'react'

import { RiCloseLine } from 'react-icons/ri'

import { IBaseModalProps } from './types'

import * as Styles from './styles'

const BaseModal = (props: IBaseModalProps): ReactElement => {
  return (
    <Styles.BaseModalContainer
      isOpen={props.isModalOpen}
      onRequestClose={props.handleCloseModal}
      overlayClassName="react-modal-overlay"
      maxWidth={props.maxWidth}
      maxHeight={props.maxHeight}
    >
      <div className="header">
        <div />

        <h1>{props.title}</h1>

        <button type="button" onClick={props.handleCloseModal}>
          <RiCloseLine size={24} />
        </button>
      </div>

      {props.children}
    </Styles.BaseModalContainer>
  )
}

export default BaseModal
