import Code from './code.model';

export default class Group {
  group_id: String;
  group_name: String;
  code_ids: String[];
  code_list: Code[];
  _id: String;
}
