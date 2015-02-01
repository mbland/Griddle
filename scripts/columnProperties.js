var _ = require('underscore'); 

class ColumnProperties{
  constructor (allColumns, filteredColumns, childrenColumnName, columnMetadata, metadataColumns){
    this.allColumns = allColumns,
    this.filteredColumns = filteredColumns,
    this.childrenColumnName = childrenColumnName,
    this.columnMetadata = columnMetadata,
    this.metadataColumns = metadataColumns
  }

  getMetadataColumns(){
    var meta = _.map(_.where(this.columnMetadata, {visible: false}), function(item){ return item.columnName});
      if(meta.indexOf(this.childrenColumnName) < 0){
         meta.push(this.childrenColumnName);
      }
      return meta.concat(this.metadataColumns); 
  }


  getColumns(){
    var ORDER_MAX = 100;

    //if we didn't set default or filter
    var filteredColumns = this.filteredColumns.length === 0 ? this.allColumns : this.filteredColumns; 

    filteredColumns = _.difference(filteredColumns, this.metadataColumns); 

    filteredColumns = _.sortBy(filteredColumns, (item) => {
        var metaItem = _.findWhere(this.columnMetadata, {columnName: item});

        if (typeof metaItem === 'undefined' || metaItem === null || isNaN(metaItem.order)){
            return ORDER_MAX;
        }

        return metaItem.order;
    });
    
    return filteredColumns;
  }
}

module.exports = ColumnProperties; 