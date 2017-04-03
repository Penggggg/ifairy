import * as Mongoose from 'mongoose';
import { ISclassify } from '../../interface/schema.interface';

export let ClassifySchema = new Mongoose.Schema({
    classifyTitle: String,
    keyCode: String,
    children: String,
    meta: {
        createdTime: {
            type: Date,
            default: Date.now( )
        }, 
        updatedTime: {
            type: Date,
            default: Date.now( )          
        }
    }
})


ClassifySchema.pre('save', function( next ){
    if ( this.isNew ) {
        this.meta.createdTime = this.meta.updatedTime = Date.now( )
    } else {
        this.meta.updatedTime = Date.now( );
    }
    next( );
})

ClassifySchema.statics.findAll =  function( ) {
    return new Promise(( resolve, reject ) => {
        this.find({ }, ( err, data) =>  returnData( err, resolve, reject, data ))
    })
}

ClassifySchema.statics.save = function( classifyTitle, keyCode, children ) {
    return new Promise(( resolve, reject ) => {
        let model = this.model('Classify');
        new model({ classifyTitle, keyCode, children })
            .save(( err ) => returnData( err, resolve, reject ))
    })
}


function returnData ( err, resolve, reject, result? ) {
    if ( err ) { 
        console.log(`数据库查询错误: ${err}`)
        reject( err );
    }
    resolve( result )
}

