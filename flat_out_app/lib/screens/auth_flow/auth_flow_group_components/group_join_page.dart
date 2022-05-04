import 'package:flat_out_app/components/atoms/text_styles.dart';
import 'package:flat_out_app/components/molecules/auth_text_confirm_passwords.dart';
import 'package:flat_out_app/components/molecules/auth_text_field.dart';
import 'package:flat_out_app/components/templates/alert.dart';
import 'package:flat_out_app/components/templates/toast_page.dart';
import 'package:flat_out_app/core/backend_management/http_requests.dart';
import 'package:flat_out_app/core/backend_management/runtime_cache.dart';
import 'package:flat_out_app/core/jsons/fom_group.dart';
import 'package:flat_out_app/core/jsons/fom_res.dart';
import 'package:flat_out_app/core/jsons/utils/enums.dart';
import 'package:flat_out_app/main.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class GroupJoinPage extends ToastWrapper {
  @override
  State<StatefulWidget> createState() => _GroupJoinPageState();
}

class _GroupJoinPageState extends State<GroupJoinPage> {
  final TextEditingController _gName = TextEditingController();
  final TextEditingController _pWord = TextEditingController();
  RoleType _type = RoleType.writer;
  bool _noPass = false;
  bool _isLoading = false;

  void join() async {
    try {
      FomRes res = await FomReq.groupJoin(_gName.text, _pWord.text, context.read<RuntimeCache>().user!.token, _type);
      if (res.statusCode == 200) {
        if (_type != RoleType.request) {
          widget.successToast(res.msg, context);
          context.read<RuntimeCache>().addGroup(FomGroup.fromJson(res.item));
        } else {
          widget.successToast("You've successfully requested to join group ${_gName.text}. This won't take effect "
              "until an owner of the group has authorized your request", context);
        }
        context.read<RuntimeCache>().readyCache();
      } else
        widget.errorToast(res.msg, context);
    } catch (e) {
      widget.fuckMeToast("${e}", context);
    }
    setState(() => _isLoading = false);
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        AuthTextField(
          controller: _gName,
          hintText: "Flat Name",
        ),
        AuthTextConfirmPasswords(
          readOnly: _noPass,
          controller: _pWord,
          hintText: "Flat Password",
        ),
        Container(
          child: Wrap(
            alignment: WrapAlignment.spaceBetween,
            crossAxisAlignment: WrapCrossAlignment.center,
            children: [
              Text(
                "Authority: ",
                style: Theme.of(context).textTheme.subtitle1,
                textAlign: TextAlign.left,
              ),
              DropdownButtonHideUnderline(
                child: DropdownButton(
                  borderRadius: BorderRadius.all(Radius.circular(10)),
                  value: _type,
                  items: RoleType.values
                      .where((element) => element != RoleType.mentioned)
                      .map((e) => DropdownMenuItem<RoleType>(
                            value: e,
                            child: Text(e.name.capitalize(), style: TextStyles.inputTextStyle(context: context)),
                          ))
                      .toList(),
                  onChanged: (RoleType? value) {
                    if (value != null)
                      setState(() {
                        _type = value;
                        _noPass = false;
                        if (value == RoleType.request) {
                          _noPass = true;
                          _pWord.text = "";
                        }
                      });
                  },
                ),
              ),
              IconButton(
                splashRadius: Theme.of(context).textTheme.subtitle1?.fontSize,
                onPressed: () {
                  Alert.showAlertDialog(
                    context: context,
                    title: "Flat Group Authority",
                    body: RichText(
                      text: TextSpan(
                        style: Theme.of(context).textTheme.bodyText1,
                        children: [
                          TextSpan(
                            text: "Password Required:",
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              color: Color(0xff383e64),
                              fontStyle: FontStyle.italic,
                            ),
                          ),
                          TextSpan(
                            text: "\n\nOwner: ",
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              color: Color(0xff383e64),
                            ),
                          ),
                          TextSpan(text: "To become an owner, signup as a flatmate. Owners of the group can then "
                              "assign you to being an owner"),
                          TextSpan(
                            text: "\n\nFlatmate: ",
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              color: Color(0xff383e64),
                            ),
                          ),
                          TextSpan(
                            text: "You share a flat with the members of this group.",
                          ),
                          TextSpan(
                            text: "\n\nAssociate: ",
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              color: Color(0xff383e64),
                            ),
                          ),
                          TextSpan(
                            text: "You know someone in this group (you could be a partner, friend, landlord, etc).",
                          ),
                          TextSpan(
                            text: "\n\n\nNo Password:",
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              color: Color(0xff383e64),
                              fontStyle: FontStyle.italic,
                            ),
                          ),
                          TextSpan(
                            text: "\n\nRequest: ",
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              color: Color(0xff383e64),
                            ),
                          ),
                          TextSpan(
                            text: "Request's will notify owners of the group that you want to join. Said owners can "
                                "accept you into the group and will select your authority at that time.",
                          ),
                        ],
                      ),
                    ),
                  );
                },
                color: Colors.grey,
                icon: Icon(Icons.help),
                iconSize: Theme.of(context).textTheme.subtitle1?.fontSize,
              ),
            ],
          ),
        ),
        Padding(
          padding: EdgeInsets.only(top: MediaQuery.of(context).size.height / 20),
          child: ElevatedButton(
            onPressed: () {
              setState(() => _isLoading = true);
              FocusManager.instance.primaryFocus?.unfocus();
              join();
            },
            child: _isLoading
                ? SizedBox(
                    height: Theme.of(context).textTheme.button?.fontSize,
                    width: Theme.of(context).textTheme.button?.fontSize,
                    child: CircularProgressIndicator(
                      strokeWidth: (Theme.of(context).textTheme.button?.fontSize ?? 10) / 5,
                      color: Theme.of(context).scaffoldBackgroundColor,
                    ),
                  )
                : Text("Join"),
          ),
        ),
      ],
    );
  }
}
