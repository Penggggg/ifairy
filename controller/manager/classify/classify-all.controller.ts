import * as Koa from 'koa';
import classifyModel from '../../../model/classify/classify.model';

export let mClassifyAll = async( ctx: Koa.Context ) => {
    let data = await classifyModel.findAll( );
    ctx.body = data;
}