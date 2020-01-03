import React from 'react';
import { ToolsItem } from '../Items';
import { connect } from 'react-redux';
import { changeResolution } from '../../actions';


class ToolsResolution extends React.Component {
    render(){
        const { setResolution } = this.props;
        //setWorkingOn({workingOn: '4x4'})
        return (
            <section className="tools">
                <h2>Resolutions</h2>
                <ul className="tools-list" id="tools_list">
                    <ToolsItem onClick={() => setResolution(4)} text='4x4'/>
                    <ToolsItem onClick={() => setResolution(32)} text='32x32'/>
                    <ToolsItem onClick={() => setResolution(128)} text='128x128' />
                </ul>
            </section>
        )
    }
}

const mapStateToProps = store => {
    return {
        workingOn: store.workingOn,
    }
}
  
const mapDispatchToProps = dispatch => ({
    setResolution: newRes => dispatch(changeResolution(newRes)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ToolsResolution);