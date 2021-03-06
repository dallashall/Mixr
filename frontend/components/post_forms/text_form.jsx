import React from 'react';
import Modal from 'react-modal';
import { style } from '../session/modal_style';
import PostFormContainer from './post_form_container';

class TextForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      title: '',
      body: '',
      source: '',
      post_type: 'text'
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({
      showModal: false,
      title: '',
      body: '',
      source: '',
      post_type: ''
    });
  }

  handleSubmit () {
    const post = {
      title: this.state.title,
      body: this.state.body,
      source: this.state.source,
      post_type: this.state.post_type
    };
    this.props.createPost({post})
              .then(this.handleCloseModal());
  }

  render () {
    return (
      <div className="test">
        <button
          className="post-btn"
          onClick={this.handleOpenModal}
        >
          <label className="btn-content">
            <section className="post-hover text-icon">
            Aa
            </section>
            <span className="btn-label">Text</span>
          </label>
        </button>

        <Modal
          closeTimeoutMS={300}
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
          style={style}
          onRequestClose={this.handleCloseModal}
        >

        <div className="blur">
          <div className="post-form">

            <div className="primary-field">
              <span className="poster">{this.props.currentUser.username}</span>

              <textarea className="primary-input"
                type="text"
                placeholder="Title"
                value={this.state.title}
                onChange={this.update('title')}
              />
            </div>

            <div className="post-field">
              <textarea className="post-input"
                type="text"
                placeholder="Your text here"
                value={this.state.body}
                onChange={this.update('body')}
              />
            </div>

            <div className="submission">
              <div className='modal-button'>
                <button className="btn form-button" onClick={this.handleCloseModal}>
                  Close
                </button>

                <button className="btn submit-button"
                  onClick={this.handleSubmit}
                  disabled={!this.state.title && !this.state.body}
                >
                  Post
                </button>
              </div>
            </div>

          </div>
        </div>



        </Modal>
      </div>
    );
  }
}

export default PostFormContainer(TextForm);
