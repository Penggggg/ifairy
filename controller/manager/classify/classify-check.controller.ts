import * as Koa from 'koa';
import classifyModel from '../../../model/classify/classify.model';

export let mClassifyAll = async( ctx: Koa.Context ) => {
    let data = await classifyModel.findAll( );
    ctx.body = data;
}

export let mClassifyIsExist = async( ctx: Koa.Context ) => {
    let { classifyTitle } = ctx.request.query;
    let data = await classifyModel.checkByTitle( classifyTitle );
    console.log(`data: ${data}`)
    ctx.body = data ? true : false ;
}