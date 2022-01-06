/**
 * NAMES: Get all the group names. Group names are publicly known to show users what groups already exist.
 */
export async function groupNames(): Promise<any> {

}

/**
 * JOIN: Attempt to join a group. Groups are password protected. This means that only those with knowledge of the
 * group can log in. If the user logs in, they are stored as a member of the group (and will no longer need to login).
 * @param body
 */
export async function groupJoin(body: any): Promise<any> {

}

/**
 * LOGIN: This function will authenticate a user, and check they have already joined the group. If the user can
 * verify that they are committing the action, then (and only then) will the followin
 * @param body
 */
export async function groupLogin(body: any): Promise<any> {

}
