//{ data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } },

export const allPapersElementCreator = (array) => {
    const elements = [];
    array.forEach(obj => {
        elements.push({
            data: {
                id: obj.paperId,
                label: obj.title,
                // idType: obj.paperIdType
            }
        });

        if(obj.relatedWorks) {
            obj.relatedWorks.forEach(innerObj => {
                elements.push({
                    data: {
                        source: obj.paperId,
                        target: innerObj.paperId,
                        label: obj.title + " " + innerObj.title
                    }
                })
            });
        }
    });

    return elements;
}

export const simpleExpandElements = (array, nodeId) => {


}



