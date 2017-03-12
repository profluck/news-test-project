import React from 'react';
import './NewsList.css';
import { emit } from '../dispatcher/ApplicationDispatcher';
import AppAction from '../constants/ApplicationConstants';
import { getState, addChangeListener } from '../stores/StoreListNews';

let NewsList = class NewsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: []
        };
    }

    componentWillMount(){
        this.__fetchDataNews();
    }

    componentDidMount() {
        addChangeListener(this.__update.bind(this));
    }

    __update() {
        this.setState({items: getState().items});
    }

    __fetchDataNews() {
        emit(AppAction.LOAD_NEWS);
    }

    render () {

        console.log("RENDER",  this.state.items);

        return (
            <div className="col-md-24">
                <section id="news-block">
                    <h2>Latest news</h2>
                    <table className="table" cellPadding={0} cellSpacing={0}>
                        <tbody>
                        {
                            this.state.items.map( function(item, i) {

                                return (
                                    <tr key={item.id}>
                                        <td>
                                            <div className="news-item">
                                                <ul>
                                                    <li>
                                                        <div className="new-item-head clearfix">
                                                            <h3> {item.title} </h3>
                                                            <time>Posted at: {item.post_date} </time>
                                                        </div>
                                                    </li>
                                                    <li className="item-content clearfix">
                                                        <p>
                                                            <img src={item.image} width="80" alt={item.title} />
                                                            <span> {item.text} </span>
                                                        </p>
                                                    </li>
                                                </ul>
                                                <div className="pan">
                                                    <a href="#">
                                                        &nbsp;Full item
                                                        <i className="fa fa-caret-down" aria-hidden="true" />
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                        <tfoot>
                        <tr>
                            <td>
                                <div className="row">
                                    <div className="col-md-24 text-center">
                                        <div className="pagination">
                                            <ul className="pagination">
                                                <li><a href="#">&laquo;</a></li>
                                                <li><a href="#">1</a></li>
                                                <li><a href="#">2</a></li>
                                                <li><a href="#">3</a></li>
                                                <li><a href="#">4</a></li>
                                                <li><a href="#">5</a></li>
                                                <li><a href="#">&raquo;</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </tfoot>

                    </table>
                </section>
            </div>
        )
    }

};

export default NewsList;