import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';
class DishDetail extends Component {

	constructor(props){
		super(props);
	}

	renderDish(dish) {
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
   renderComments(dish){
    if(dish != null)
    {
        let options = { year: 'numeric', month: 'short', day: 'numeric' };
       const com = dish.comments.map((comment)=>{
            return(
            
                
                    <li className="mb-3" key={comment.id}>{comment.comment}
                        <ul className = "list-unstyled">
                            <li className="mt-3">-- {comment.author} , {new Date(comment.date).toLocaleDateString("en-US", options)}</li>
                        </ul>
                    </li>

               
            
            );
        });
        return(<div className='ml-1'>
                    <h5>Comments</h5>
                  <ul className = "list-unstyled">
                        {com}
                  </ul> 
                </div>   
            );

    }
    else{
        return(
        <div> </div>
        );
    }
       
        
   }
	render(){
		return(

			<div className="row">
                  <div  className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.selectedDish)}
                  </div>
                  <div className="col-md">
                    {this.renderComments(this.props.selectedDish)}

                  </div>

                
                </div>
			);
	}

}


export default DishDetail;