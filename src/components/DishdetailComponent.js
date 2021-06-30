import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem ,Button ,Modal, ModalHeader, ModalBody,Row , Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';



const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{

    constructor(props){
        super(props);
        this.state={
            isModalOpen: false,
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(values) {
        this.toggleModal();
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        

    }



    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
    render(){
        return(
            <>
            <Button onClick={this.toggleModal} type='button' className="btn btn-outline-secondary"><i className="fa fa-pencil" aria-hidden="true"></i> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                <div className='container'>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                                <Label htmlFor="rating" >Rating</Label>
                            
                                    <Control.select model=".rating"
                                        className="form-control"
                                        name="rating"
                                        id="rating" defaultValue='1'
                                    >
                                      
                                        <option selected>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                    
                    </Row>

                    <Row className="form-group">
                                <Label htmlFor="yourname" >Your Name</Label>
                                    <Control.text model=".author" id="yourname" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                />
                    </Row>

                    <Row className="form-group">
                        <Label htmlFor="text" >Comment</Label>
                        <Control.textarea model=".comment" id="text" name="comment"
                                        rows={5}
                                        className="form-control"
                                         />
                    </Row>
                    <Row className="form-group">
                                    <Button type="submit" color="primary">
                                    SUbmit
                                    </Button>
                    </Row>

                </LocalForm>    
                </div>
                
                    
                </ModalBody>
            </Modal>

            </>
        );
    }
    

}
    


function RenderDish({dish}){
    if (dish != null)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
}

function RenderComments({comments}){

    if(comments != null)
    {
        
       const com = comments.map((comment)=>{
            return(
            
                
                    <li className="mb-3" key={comment.id}>{comment.comment}
                        <ul className = "list-unstyled">
                            <li className="mt-3">-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
                        </ul>
                    </li>

               
            
            );
        });
        return(<div>
                    <h5>Comments</h5>
                  <ul className = "list-unstyled">
                        {com}
                  </ul> 
                  <CommentForm />
                </div>   
            );

    }
    else{
        return(
        <div> </div>
        );
    }


}
   
const DishDetail = (props)=>{

    return (
                <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
                </div>
            );

}
	




export default DishDetail;