import React from 'react';
import { ToolsItem } from '../Items';
import { connect } from 'react-redux';
import { changeResolution } from '../../actions';


class ToolsResolution extends React.Component {
    get ToolItems() {
        const { setResolution } = this.props;
        return [
            {
                resSize: 4,
                onClick: () => setResolution(4),
                text: '4x4',
            },
            {
                resSize: 32,
                onClick: () => setResolution(32),
                text: '32x32',
            },
            {
                resSize: 128,
                onClick: () => setResolution(128),
                text: '128x128',
            },
        ]
    }
    render(){
        const {
            ToolItems,
            props
        } = this;
        const { resolution } = props;
        return (
            <section className="tools">
                <h2>Resolutions</h2>
                <ul className="tools-list" id="tools_list">
                    {
                        ToolItems.map((item, key) => {
                            const {
                                resSize,
                                onClick,
                                text
                            } = item
                            const highlighted = resSize === resolution;
                            return <ToolsItem
                                key={key}
                                onClick={onClick}
                                text={text}
                                highlighted={highlighted}
                            />
                        })
                    }
                </ul>
            </section>
        )
    }
}

const mapStateToProps = store => {
    return {
        resolution: store.resolution,
    }
}
  
const mapDispatchToProps = dispatch => ({
    setResolution: newRes => dispatch(changeResolution(newRes)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ToolsResolution);